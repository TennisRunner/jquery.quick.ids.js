


$(document).ready(function()
{
	let form = $.contactForm;

	form.on("submit", function(e) 
	{
		e.preventDefault();

		let name = form.name.val().trim();
		let email = form.email.val().trim();
		let message = form.message.val().trim();

		if(name.length == 0 ||
			email.length == 0 ||
			message.length == 0)
			return;

		$("body").append(`Hello, ${name}. Your message has been sent and you will receive a reply at ${email}.`);
	});
});