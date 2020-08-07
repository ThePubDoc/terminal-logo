const fs = require('fs');
const os = require('os');
const art = require('ascii-art');
const Font = require('ascii-art-font');
const readline = require('readline');

Font.fontPath = 'Fonts/';

module.exports = () => {
	const path = os.homedir();

	const rc =
		'/.' +
		process.env.SHELL.split('/')[process.env.SHELL.split('/').length - 1] +
		'rc';
	const rcPath = os.homedir + rc;

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question('What will be the name of your logo ? ', function (name) {
		rl.question('What will be the Command to display your logo ? ', function (
			command
		) {
			Font.create(`${name}`, 'Doom', function (err, rendered) {
				console.log(rendered);
				fs.appendFile(`${path}/${name}.txt`, rendered, (err) => {
					if (err) {
						console.log(err);
					} else {
						fs.appendFile(
							rcPath,
							`alias ${command}="cat ~/${name}.txt" \ncat ~/${name}.txt`,
							(err) => {
								if (err) {
									console.log(err);
								} else {
									rl.close();
								}
							}
						);
					}
				});
			});
		});
	});

	rl.on('close', function () {
		process.exit(0);
	});
};
