      const URL = "../models/tomato/my_model/";

      let model, webcam, labelContainer, maxPredictions;

      async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
          labelContainer.appendChild(document.createElement("div"));
        }
        predict();
      }

      async function predict() {
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

      function getResult() {
        let result = document.querySelector("#checkResult");
        let normalResult = document.querySelector("#resultNormal");
        let diseaseResult = document.querySelector("#resultDisease");
        let normal = document.querySelector("#label-container").firstChild.innerText;
        let disease = document.querySelector("#label-container").lastChild.innerText;
        

        const resultObj = {
          result: result,
          normalResult: normalResult,
          diseadeResult: diseaseResult,
          normal: normal,
          disease: disease,
        }
        changeResult(resultObj);
      }

      // check result
      function changeResult() {
        getResult();
        let normalArr = resultObj.normal.split(" ");
        let diseaseArr = resultObj.disease.split(" ");
        const normalNum = Number(normalArr[1]);
        const diseaseNum = Number(diseaseArr[1]);
        resultObj.result.style.display = 'none';
        if(normalNum > diseaseNum) {
          resultObj.normalResult.style.display = 'block';
        } else if(normalNum < diseaseNum) {
          resultObj.diseaseResult.style.display = 'block';
        }
      }