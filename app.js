document.addEventListener("DOMContentLoaded", () => {
  let counter;
  let levelIndex = 0
  let clockIsRunning = false
  let isStructureLoaded = false
  let isBreak = false
  let levelsInfo = [
    { small: null, big: null, ante: null, length: null, break: false },
    { small: null, big: null, ante: null, length: null, break: false }
  ]
  const input = document.querySelector('input')
  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    const dataArray = e.target.result.split("\r\n")
    levelsInfo = dataArray.slice(1, dataArray.length - 1).map(element => {
      let parsedElement = element.split(",")
      return {
        small: parsedElement[0],
        big: parsedElement[1],
        ante: parsedElement[2],
        length: parsedElement[3],
        break: parsedElement[0].toLowerCase() === 'break'
      }
    });
    isStructureLoaded = true
    setLevel(false)
    input.classList.add("hidden")
    setLevelSelect()
  }

  input.onchange = (e) => {
    const [file] = e.target.files
    fileReader.readAsBinaryString(file)
  }

  let playSound = () => {
    var audio = new Audio('guitar-slide.mp3');
    audio.loop = false;
    audio.play();
  }

  let setLevel = (shouldPlaySound) => {
    if (shouldPlaySound) {
      playSound()
    }
    counter = levelsInfo[levelIndex].length * 60
    setClock(counter)
    setLevelInfo()
    setNextLevelInfo()
    document.getElementById('body').classList.add('bg-green-800')
    document.getElementById('body').classList.remove('bg-red-800')
    countDown(counter)
  }

  let setLevelInfo = () => {
    let levelInfo = levelsInfo[levelIndex]
    if (levelInfo.break) {
      isBreak = true
      document.getElementById("small").innerHTML = "-"
      document.getElementById("big").innerHTML = "-"
      document.getElementById("ante").innerHTML = "-"
      document.getElementById("break").innerHTML = "~ Break ~"
    } else {
      isBreak = false
      document.getElementById("small").innerHTML = levelInfo.small
      document.getElementById("big").innerHTML = levelInfo.big
      document.getElementById("ante").innerHTML = levelInfo.ante
      document.getElementById("break").innerHTML = null
    }
  }

  let setNextLevelInfo = () => {
    let nextLevelIndex = levelIndex + 1
    if(levelsInfo[nextLevelIndex].break) {
      nextLevelIndex++
    }

    let nextLevel = levelsInfo[nextLevelIndex]
    document.getElementById("next_small").innerHTML = nextLevel.small
    document.getElementById("next_big").innerHTML = nextLevel.big
    document.getElementById("next_ante").innerHTML = nextLevel.ante
  }

  document.getElementById("timer-toggle").addEventListener('click', () => toggleClock())
  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      toggleClock()
    }
  })

  let countDown = (endTime) => {
    if (clockIsRunning) {
      if (endTime >= 0) {
        setClock(endTime)
        setTimeout(() => {
          countDown(endTime - 1);
        }, 1000);
        counter--;
        if (endTime < 300) {
          document.getElementById('body').classList.remove('bg-green-800')
          document.getElementById('body').classList.add('bg-red-800')
        }
      } else {
        levelIndex++
        setLevel(true)
      }
    }
  }

  let secondsToTime = (secs) => {
    let minutes = Math.floor(secs % 3600 / 60);
    let seconds = Math.ceil((secs % 3600) % 60);
    return minutes + ':' + seconds.toString().padStart(2, '0');
  }

  let setLevelSelect = () => {
    document.getElementById("set-level-wrapper").classList.remove("hidden")
    let levelSelect = document.getElementById("set-level")
    levelsInfo.forEach((element, index) => {
      let text = element.break ? 'Break' : element.small + "/" + element.big + "/" + element.ante
      levelSelect.options[levelSelect.options.length] = new Option(text, index);
    });
  }

  document.getElementById("set-level").addEventListener('change',
    (e) => {
      levelIndex = +e.target.value
      setLevel(false)
  })

  let setClock = (endTime) => {
    document.getElementById('count').innerHTML = secondsToTime(endTime)
  }

  let toggleClock = () => {
    clockIsRunning = !clockIsRunning
    if(!isStructureLoaded) {
      alert("Please load the tournament structure")
    } else if (clockIsRunning) {
      countDown(counter)
      document.getElementById('timer-toggle').innerHTML = "Stop"
      document.getElementById("break").innerHTML = isBreak ? "~ Break ~" : null
    } else {
      document.getElementById('timer-toggle').innerHTML = "Start"
      document.getElementById("break").innerHTML = "~ paused ~"
    }
  }



  setLevel(false);
});
