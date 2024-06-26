const express = require('express')
const app = express()
const { once } = require('events');

async function serverExec(){
    const spawner = require("child_process").spawn;

    var data_send = "Data in JS";

	data_send = JSON.stringify(data_send);

	const python_process = spawner("python", ['./src/taskpane/text_gen3.py', data_send]);

	var newData = 'lorem';
	//let newData!: string;

	
	python_process.stdin.setEncoding = 'utf-8';

	python_process.stdout.on("data", (data) => {
		//newData = `Data recieved: ${data}`;
		newData = JSON.parse(data.toString());
		//newData = data.toString();
		console.log(`data generated: `+newData)
		//console.log(`Data recieved: ${data}`);
	});

	python_process.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
        //console.log('error:' + data);
    });

	python_process.stdout.on('end', async function(code){
        //console.log('output: ' + newData);
        //console.log(`Exit code is: ${code}`);
    });

	//await once(python_process, 'close')
	return newData;
}

app.get('/obtain', async (req, res) => {
	var result = serverExec();
	res.json({result: result});
	//res.send(result)
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express API!_real lol' });
});

app.get('/test', (req, res) => {
	res.send("Hi")
});

app.listen(5000, () => {
	console.log('App started!');
});
