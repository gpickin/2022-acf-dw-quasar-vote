<template>
	<div class="q-pa-sm">
		<div class="text-center">
			<div class="text-center q-px-md">
				<label class="text-h4">Enter Your Email</label
				><q-input
					v-model="name"
					label=""
					v-on:keyup.enter="startVoting()"
					class="text-h4"
				/>
			</div>

			<div class="text-center q-pa-md">
				<q-btn
					color="primary"
					class="bg-blue-10"
					size="md"
					label="Start Voting"
					icon-right="send"
					@click.native="startVoting()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "PageIndex",
		data() {
			return {
				name: "",
			};
		},
		methods: {
			startVoting: function () {
				this.$router.push({
					path: "/voting",
					query: { name: this.name },
				});
			},
		},
	};
</script>
