import { spawn } from "child_process";

export const handlePythonScripts = async (scriptPath, dataFile) => {
  return new Promise((resolve, reject) => {
    const childScript = spawn("python", [scriptPath, dataFile]);
    let resultadoPython = {};

    // Capturar la salida estándar del script de Python
    childScript.stdout.on("data", (data) => {
      resultadoPython = data.toString();
    });

    // Capturar la salida de error estándar del script de Python
    childScript.stderr.on("data", (data) => {
      console.error(`Error del script de Python: ${data}`);
    });

    // Capturar el código de salida del script de Python
    childScript.on("close", (code) => {
      if (code !== 0) {
        console.error(`Script de Python terminó con código ${code}`);
        reject(`Script de Python terminó con código ${code}`)
      } else {
        const processedImage = {
          data: resultadoPython.trim(),
        };
        console.log(processedImage)
        resolve(processedImage)
      }
    });
  });


};
