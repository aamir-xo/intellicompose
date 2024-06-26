/*Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("prepend").onclick = prependText;
  }
});*/

Office.onReady(function () {
  // Office is ready
  $(document).ready(function () {
    // The document is ready
    $("#prepend").on("click", prependText3);
    $("#get-selected-data").on("click", getSelectedData);
    $("#neg-Ack-btn").on("click", negAck);

async function negAck() {
  Office.context.mailbox.item.getSelectedDataAsync(Office.CoercionType.Text, async function(asyncResult) {
    if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
      const selectedText = asyncResult.value.data;
      const prop = asyncResult.value.sourceProperty;
      console.log("Selected text in " + prop + ": " + selectedText);

      const data3 = { key: selectedText, type: 2 }; 
      const response = await fetch('http://localhost:5000/gen2', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data3)
      });

      const data4 = await response.json();
      const text = data4.message;
      //const text = $("#text-field").val();
      //const text = `Hello yo`;

      Office.context.mailbox.item.body.getTypeAsync((asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.log("Action failed with error: " + asyncResult.error.message);
          return;
        }

        const bodyFormat = asyncResult.value;
        Office.context.mailbox.item.body.prependAsync(text, { coercionType: bodyFormat }, (asyncResult) => {
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.log("Action failed with error: " + asyncResult.error.message);
            return;
          }

          console.log(`"${text}" prepended to the body.`);
        });
      });
    } else {
      console.error(asyncResult.error);
    }
  });
}

async function getSelectedData() {
  Office.context.mailbox.item.getSelectedDataAsync(Office.CoercionType.Text, async function(asyncResult) {
    if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
      const selectedText = asyncResult.value.data;
      const prop = asyncResult.value.sourceProperty;
      console.log("Selected text in " + prop + ": " + selectedText);

      const data3 = { key: selectedText, type: 1 }; 
      const response = await fetch('http://localhost:5000/gen2', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data3)
      });

      const data4 = await response.json();
      const text = data4.message;
      //const text = $("#text-field").val();
      //const text = `Hello yo`;

      Office.context.mailbox.item.body.getTypeAsync((asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.log("Action failed with error: " + asyncResult.error.message);
          return;
        }

        const bodyFormat = asyncResult.value;
        Office.context.mailbox.item.body.prependAsync(text, { coercionType: bodyFormat }, (asyncResult) => {
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.log("Action failed with error: " + asyncResult.error.message);
            return;
          }

          console.log(`"${text}" prepended to the body.`);
        });
      });
    } else {
      console.error(asyncResult.error);
    }
  });
}
  });
});

async function prependText3() {
  const textField = $("#text-field").val();
  const data1 = { key: textField }; 
  const response = await fetch('http://localhost:5000/gen1', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data1)
  });

  const data2 = await response.json();
  //const text = data2.message;
  //const text = data2.message.replace(/\\n/g, '<br/>')
  //const text = data2.message.replace(/\\n/g, '\n');
  const text = data2.message.split("\\n").join("\t\n");
  //const text = $("#text-field").val();
  //const text = `Hello yo`;

  Office.context.mailbox.item.body.getTypeAsync((asyncResult) => {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
      console.log("Action failed with error: " + asyncResult.error.message);
      return;
    }

    const bodyFormat = asyncResult.value;
    Office.context.mailbox.item.body.prependAsync(text, { coercionType: bodyFormat }, (asyncResult) => {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.log("Action failed with error: " + asyncResult.error.message);
        return;
      }

      console.log(`"${text}" prepended to the body.`);
    });
  });
}


async function prependText2() {
  const response = await fetch('http://localhost:5000/gen1');
  const data = await response.json();

  const text = data.message;
  //const text = $("#text-field").val();
  //const text = `Hello yo`;

  Office.context.mailbox.item.body.getTypeAsync((asyncResult) => {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
      console.log("Action failed with error: " + asyncResult.error.message);
      return;
    }

    const bodyFormat = asyncResult.value;
    Office.context.mailbox.item.body.prependAsync(text, { coercionType: bodyFormat }, (asyncResult) => {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.log("Action failed with error: " + asyncResult.error.message);
        return;
      }

      console.log(`"${text}" prepended to the body.`);
    });
  });
}

function fun1() {
  postData('data to process');
}

function postData(input) {
  $.ajax({
    type: "POST",
    url: "/login",
    data: { mydata: input },
    success: prependText1
  });
}

function callbackFunc(response) {
  // do something with the response
  console.log(response);
}

//$("#prepend").on("click", prependText);

function prependText1(response) {
  const text = response;
 
  Office.context.mailbox.item.body.getTypeAsync((asyncResult) => {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
      console.log("Action failed with error: " + asyncResult.error.message);
      return;
    }

    const bodyFormat = asyncResult.value;
    Office.context.mailbox.item.body.prependAsync(text, { coercionType: bodyFormat }, (asyncResult) => {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.log("Action failed with error: " + asyncResult.error.message);
        return;
      }

      console.log(`"${text}" prepended to the body.`);
    });
  });
}

function prependText() {
  /*
  declare var require: any

  const spawner = require("child_process").spawn;
  
  const data_send = "Data in JS";

  const python_process = spawner("python", [
    "C:/Aamir - Silverwing/BE - Study resources/EMailGPT/outlook2/Outlook-Addin-TaskPane-python-master/text_generator1.py",
    data_send
  ]);

  python_process.stdout.on("data", (data) => {
    console.log(`Data recieved: ${data}`);
  });
  */
  /*import {exec} from 'child_process'
  exec('python3 "C:/Aamir - Silverwing/BE - Study resources/EMailGPT/outlook2/Outlook-Addin-TaskPane-python-master/text_generator1.py"', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    }
    else if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    else {
      console.log(stdout);
    }
  })*/
  /* This snippet adds text to the beginning of the message or appointment's body. 
    
    When prepending a link in HTML markup to the body, you can disable the online link preview by setting the anchor tag's id attribute to "LPNoLP". For example, '<a id="LPNoLP" href="http://www.contoso.com">Click here!</a>'.
  */
  const text = $("#text-field").val();
  //const text = `Hello yo`;

  // It's recommended to call getTypeAsync and pass its returned value to the options.coercionType parameter of the prependAsync call.
  Office.context.mailbox.item.body.getTypeAsync((asyncResult) => {
    if (asyncResult.status === Office.AsyncResultStatus.Failed) {
      console.log("Action failed with error: " + asyncResult.error.message);
      return;
    }

    const bodyFormat = asyncResult.value;
    Office.context.mailbox.item.body.prependAsync(text, { coercionType: bodyFormat }, (asyncResult) => {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.log("Action failed with error: " + asyncResult.error.message);
        return;
      }

      console.log(`"${text}" prepended to the body.`);
    });
  });
}
