<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title> Dev Feud - Voting App </q-toolbar-title>

				<div>
					<a
						href="https://github.com/gpickin/2022-acf-dw-dev-feud-presentation"
						class="text-white"
						>Created By: Gavin Pickin</a
					>
				</div>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<div
				style="
					background-image: url(./family_feud.jpg);
					background-position: center 50px;
					background-repeat: no-repeat;
					background-attachment: fixed;
					min-height: 800px;
				"
			>
				<div
					class="q-mx-auto col-12"
					style="padding-top: 78px; max-width: 340px"
				>
					<div
						class="q-mx-auto"
						style="
							margin-left: -5px;
							max-width: 340px;
							background-color: rgba(255, 255, 255, 0.8);
						"
					>
						<router-view />

						<div class="q-pa-md">
							<p>
								This Game uses Survey Questions from
								<a href="https://teratech.com/">TeraTech's</a>
								State of the CF Union Survey.
							</p>
							<p>
								You can
								<a
									href="https://teratech.com/state-of-the-cf-union-2022-survey"
									target="_blank"
									>take the 2022 survey here</a
								>
								or
								<a
									href="https://teratech.com/state-of-the-cf-union-2022-survey-results-server-environment"
									target="_blank"
									>view the results here.</a
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</q-page-container>

		<q-footer>
			<q-toolbar class="flex flex-center">
				<div class="row">
					<a href="https://www.ortussolutions.com" target="_blank"
						><img
							src="~assets/ortus_logo.jpg"
							class="q-pa-xs bg-white q-ma-xs"
							style="width: 150px"
					/></a>
				</div>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
	export default {
		name: "GameLayout",
		components: {},
		data() {
			return {};
		},
	};
</script>
