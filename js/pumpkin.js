      // More API functions here:
      // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

      // the link to your model provided by Teachable Machine export panel
      const URL = "../models/pumpkin/my_model/";

      let model, webcam, labelContainer, maxPredictions;

      // Load the image model and setup the webcam
      async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
          // and class labels
          labelContainer.appendChild(document.createElement("div"));
        }
        predict();
      }

      // run the webcam image through the image model
      async function predict() {
        // predict can take in an image, video or canvas html element
        let image = document.querySelector("#uploadedImage");
        const prediction = await model.predict(image);
        for (let i = 0; i < maxPredictions; i++) {
          const classPrediction =
            prediction[i].className +
            ": " +
            prediction[i].probability.toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        changeResult();
      }

      // check result
      function changeResult() {
        let result = document.querySelector("#checkResult");
        let normalResult = document.querySelector("#resultNormal");
        let diseaseResultFirst = document.querySelector("#resultDiseaseFirst");
        let diseaseResultSecond = document.querySelector("#resultDiseaseSecond");
        let resultArr = document.querySelector("#label-container");

        let normal = resultArr.firstChild.innerText;
        let diseaseFirst = resultArr.childNodes[1].innerText;
        let diseaseSecond = resultArr.lastChild.innerText;

        let normalArr = normal.split(" ");
        let diseaseFirstArr = diseaseFirst.split(" ");
        let diseaseSecondArr = diseaseSecond.split(" ");
        
        const normalNum = Number(normalArr[1]);
        const diseaseFirstNum = Number(diseaseFirstArr[1]);
        const diseaseSecondNum = Number(diseaseSecondArr[1]);

        let numArr = [normalNum, diseaseFirstNum, diseaseSecondNum];
        let max = Math.max(...numArr);
        
        result.style.display = 'none';
        
        if(normalNum === max) {
          normalResult.style.display = 'block';
        } else if(diseaseFirstNum === max) {
          diseaseResultFirst.style.display = 'block';
        } else if(diseaseSecondNum === max) {
          diseaseResultSecond.style.display = 'block';
        }
      }