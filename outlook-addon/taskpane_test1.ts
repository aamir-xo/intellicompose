const { once } = require('events');

async function test_func(){
	const spawner = require("child_process").spawn;

	const data_send = "Data in JS";

	const python_process = spawner("python", ['./src/taskpane/text_gen3.py', data_send]);

	var newData = 'lorem';
	//let newData!: string;

	
	python_process.stdin.setEncoding = 'utf-8';

	python_process.stdout.on("data", (data) => {
		//newData = `Data recieved: ${data}`;
		newData = data.toString();
		//console.log(`data generated: `+newData)
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

	await once(python_process, 'close')
	return newData;
	
	/*
	return new Promise((res, rej) => {
        python_process.stdout.on('end', async function(code){
            console.log('output: ' + newData);
            console.log(`Exit code is: ${code}`);
            // "return" is probably wrong, what should be done instead?
            res(newData);
        })
    });
    */
}

async function executor(){
	var funcOut = await test_func();
	console.log(funcOut);
	return funcOut;
}
var epicData = 'dolor';
//console.log(executor());
(async () => {
	epicData = await test_func();
  //console.log(await test_func())
})()
console.log(epicData);