<template>
	<div class="q-pa-sm" style="min-height: 300px">
		<div class="bg-black q-pa-xs q-mb-sm">
			<div class="text-h5 bg-blue text-white text-center q-pa-sm">
				{{ $route.query.name }}
			</div>
		</div>

		<div
			v-if="!display && !surveysDone"
			class="text-center text-h5 q-pa-lg"
		>
			LOADING QUESTIONS
		</div>
		<div v-if="surveysDone" class="text-h5 text-blue">
			<div class="bg-orange q-pa-sm">
				<div class="text-h4 bg-black text-orange text-center q-pa-sm">
					<p>You're voted on all the questions</p>
					<p>Thanks!</p>
				</div>
			</div>
		</div>

		<div v-if="display">
			<div class="bg-orange q-pa-sm">
				<div class="text-h4 bg-black text-orange text-center q-pa-sm">
					{{ questions.length }} Questions
				</div>
			</div>

			<div v-if="this.isSurveyComplete" class="q-pa-md text-center">
				<q-btn
					size="large"
					flat
					color="white"
					label="Vote on More Questions"
					class="bg-green"
					@click="resetSurvey()"
				/>
			</div>
			<div class="text-h6 text-black q-py-sm">
				Question {{ currentQuestion + 1 }}:
			</div>

			<div class="text-h5">{{ getCurrentQuestion.question }}</div>

			<div
				v-if="showVotes && !isSurveyComplete"
				class="text-center q-py-md"
			>
				<q-btn
					size="large"
					icon-right="send"
					flat
					color="white"
					label="Next"
					class="bg-green"
					@click="nextQuestion()"
				/>
			</div>

			<q-banner
				inline-actions
				v-for="answer in getCurrentQuestion.answers"
				v-bind:key="answer.answerID"
				class="q-ma-sm text-white bg-blue"
				:class="{ 'bg-orange': answer.selected }"
				@click="selectAnswer(answer)"
			>
				<span class="text-h6">{{ answer.answer }}</span>

				<template v-slot:action>
					<span v-if="showVotes">{{ answer.votesCount }}</span>
				</template>
			</q-banner>

			<div
				v-if="showVotes && !isSurveyComplete"
				class="text-center q-py-md"
			>
				<q-btn
					size="large"
					icon-right="send"
					flat
					color="white"
					label="Next"
					class="bg-green"
					@click="nextQuestion()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { axiosInstance } from "boot/axios";

	export default {
		name: "PageGame",
		data() {
			return {
				name: "",
				questions: [],
				currentQuestion: 0,
				display: false,
				showVotes: false,
				currentScore: 0,
				surveysDone: false,
			};
		},
		computed: {
			getCurrentQuestion() {
				if (this.display) {
					return this.questions[this.currentQuestion];
				} else {
					return {};
				}
			},
			isSurveyComplete() {
				return (
					this.currentQuestion == this.questions.length - 1 &&
					this.showVotes
				);
			},
		},
		mounted() {
			this.getQuestions();
		},
		methods: {
			resetSurvey() {
				this.name = "";
				this.questions = [];
				this.currentQuestion = 0;
				this.display = false;
				this.showVotes = false;
				this.currentScore = 0;
				this.getQuestions();
			},
			selectAnswer(answer) {
				if (!this.showVotes) {
					this.getCurrentQuestion.answers.sort(function (a, b) {
						return b.votePercentage - a.votePercentage;
					});
					this.showVotes = true;
					answer.selected = true;
					axiosInstance
						.post(`votable-questions`, {
							questionID: answer.questionID,
							answerID: answer.answerID,
							voter: this.$router.currentRoute.query.name,
						})
						.then(({ data }) => {
							if (!data.error) {
								this.$q.notify({
									color: "positive",
									textColor: "white",
									icon: "people",
									position: "bottom-right",
									message: "Vote saved",
									timeout: 1000,
								});
							} else {
								this.$q.notify({
									color: "negative",
									textColor: "white",
									icon: "people",
									position: "bottom-right",
									message: `Error Saving Vote - ${data.messages[0]}`,
									timeout: 0,
									actions: [{ label: "Dismiss", color: "white" }],
								});
							}
						})
						.catch((error) => {
							this.$q.notify({
								color: "negative",
								textColor: "white",
								icon: "people",
								position: "bottom-right",
								message: `Error Saving Vote - ${error.message}`,
								timeout: 0,
								actions: [{ label: "Dismiss", color: "white" }],
							});
						});
					if (this.isSurveyComplete) {
						this.$q.notify({
							color: "positive",
							textColor: "white",
							icon: "people",
							position: "center",
							message:
								"You have voted on all of the questions. Thank you.",
							timeout: 0,
							actions: [{ label: "Dismiss", color: "white" }],
						});
					}
				}
			},
			nextQuestion() {
				if (!this.isSurveyComplete) {
					this.showVotes = false;
					if (this.currentQuestion < this.questions.length) {
						this.currentQuestion = this.currentQuestion + 1;
					}
				}
			},
			getQuestions() {
				axiosInstance
					.get(`votable-questions`, {
						params: { voter: this.$router.currentRoute.query.name },
					})
					.then(({ data }) => {
						// updating pagination to reflect in the UI
						this.questions = data.data;
						if (this.questions.length) {
							this.questions.map(function (question) {
								return question;
							});
							this.display = true;
						} else {
							this.surveysDone = true;
						}
					})
					.catch((error) => {
						// there's an error... do SOMETHING
						console.log(error);
						alert("Error loading Questions");
						this.$router.push({
							path: "/",
						});
					});
			},
		},
	};
</script>
