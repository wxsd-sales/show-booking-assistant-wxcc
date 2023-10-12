<script>
	import { onMount } from 'svelte';
	import {sendMessage} from './functions';
	import SveltyPicker from 'svelty-picker';
	import {PUBLIC_BACKGROUND_URL} from '$env/static/public';

	let dialog, confDialog;
	let currentDate = new Date();
	onMount( () => {
		dialog = document.getElementById('main-dialog');
		confDialog = document.getElementById('confirmation-dialog');
	})

	async function onSubmit(e) {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data)
		await sendMessage(data.name,data.phone,data.show)
		e.target.reset();
		closeClick();
	}

	const showConfDialogClick = () => {
			confDialog['showModal']();
	};

	const showDialogClick = () => {
			dialog['showModal']();
	};

	const closeClick = () => {
		dialog.close();
	};
	const closeConfClick = () => {
		confDialog.close();
	};
</script>
 <body style="background-image: url({PUBLIC_BACKGROUND_URL});">
	<div class="parent" style="background-color: #ffffff">
  <img class="image1" src="https://cdn.glitch.global/9d61d6d3-fe2d-454a-8661-2a5ac9778baa/Screenshot_20231004-094143_Chrome(1).jpg?v=1697030429173" alt="mgm_heading"/>
</div>
	<button class="primary"  on:click={() => showDialogClick()}>Book a Show!</button>
	<dialog id="main-dialog">
		<form class="content" on:submit|preventDefault={onSubmit}>
			<h4><b>Book a Show!</b></h4>

			<hr class="solid">
			<div class="field">
				<label class="label" for="nameLabel">Name</label>
				<div class="control">
					<input class="input" type="text" id="name" name="name" placeholder="Enter your name" required>
				</div>
			</div>
			<div class="field">
				<label class="label" for="phoneLabel">Phone Number</label>
				<div class="control">
					<input class="input" type="text" id="phone" name="phone" placeholder="Enter your phone number" required>
				</div>
			</div>
			<div class="field">
			<label class="label" for="notLabel">Select a Show</label>
			<div class="select is-fullwidth" >
				<select name="show" id="show" required>
					
					<option>Comedy Club</option>
					<option>David Copperfield Show</option>
					<option>Magic Show</option>
					<option>The Hunger Games:Exhibition</option>
				</select>
			</div>
			</div>
			<hr class="solid">
			<div class="columns is-multiline is-mobile">
				<div class="column">
					<button class="button is-success is-rounded is-fullwidth" >Submit</button>
				</div>
				<div class="column">
					<button type="submit" class="button is-danger is-outlined is-rounded is-fullwidth">Cancel</button>
				</div>
			</div>
		</form>
	</dialog>
	<dialog id="confirmation-dialog">
		<div class="content">
			<h3>
				Thank you! Your appointment is now scheduled!
			</h3>
			<p>
				Please check your whatsapp for the link to join your meeting with the consultant.
			</p>
			<button class="button is-danger is-outlined is-rounded" on:click={closeConfClick}>Close</button>
		</div>
	</dialog>
</body>
<svelte:head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-calendar@6.1.14/dist/css/bulma-calendar.min.css">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<style>
	:root {
		padding: 10px;
	}
	dialog {
		border-radius: 5px;
		width: 80%;
		transition: all 2s;
		background-color: white;
	}
	dialog::backdrop {
		background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7));
		animation: fade-in 1s;
	}
	hr.solid {
		border-top: 3px solid #bbb;
	}
	:global(body){
		height:100%;
		width: 100%;
		position: absolute;
		background-size: cover;
		top: 0;
		right:0;     
    }
	.custom-primary {
  background-color: #00012a;
  color: white;
}
	.primary{
		position: absolute;
		margin-left:-10px;
   left:12%;
   margin-right:-10px;
   right:12%;
   margin-bottom:-8px;
   bottom:8%;
   width:80%;
		margin-right:3rem;
		background-color: #00012a;
		border-radius: 12px;
		border: none;
		color: white;
		padding: 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
		margin-bottom:3rem;
	}
	
	@keyframes fade-in 
	{
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>