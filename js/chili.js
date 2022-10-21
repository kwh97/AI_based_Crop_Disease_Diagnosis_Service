      const URL = "../models/chili/my_model/";

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

      // check result
      function changeResult() {
        let result = document.querySelector("#checkResult");
        let normalResult = document.querySelector("#resultNormal");
        let diseaseResultFirst = document.querySelector("#resultDiseaseFirst");
        let diseaseResultSecond = document.querySelector("#resultDiseaseSecond");
        let resultArr = document.querySelector("#label-container");

        let normalFirst = resultArr.firstChild.innerText;
        let normalSecond = resultArr.childNodes[1].innerText;
        let diseaseFirst = resultArr.childNodes[2].innerText;
        let diseaseSecond = resultArr.lastChild.innerText;

        let normalFirstArr = normalFirst.split(" ");
        let normalSecondArr = normalSecond.split(" ");
        let diseaseFirstArr = diseaseFirst.split(" ");
        let diseaseSecondArr = diseaseSecond.split(" ");
        
        const normalFirstNum = Number(normalFirstArr[2]);
        const normalSecondNum = Number(normalSecondArr[2]);
        const diseaseFirstNum = Number(diseaseFirstArr[1]);
        const diseaseSecondNum = Number(diseaseSecondArr[1]);
        
        let numArr = [normalFirstNum, normalSecondNum, diseaseFirstNum, diseaseSecondNum];
        let max = Math.max(...numArr);

        result.style.display = 'none';
        
        if(max === normalFirstNum || max === normalSecondNum) {
          normalResult.style.display = 'block';
        } else if(max === diseaseFirstNum) {
          diseaseResultFirst.style.display = 'block';
        } else if(max === diseaseSecondNum) {
          diseaseResultSecond.style.display = 'block';
        } 
      }
