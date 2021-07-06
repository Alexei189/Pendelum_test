import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Pendelum(prop) {
  const store = useSelector((store) => store);
  const pLen = store.range.lengthPen;
  const angl = store.range.anglePen;

  useEffect(() => {
    function Simulation(len, grav, angle0, tstep, callback) {
      //длина (м), ускорение свободного падения (м/c^2),
      //начальный угол (рад.), шаг по времени (мс), функция отрисовки
      let velocity = 0;
      let angle = angle0;
      let k = -grav / len;
      let tsec = tstep / 1000;
      let coeffT = 0.999; //"трение" из интервала ]0;1], =1 - без замедления
      return setInterval(function () {
        let acceleration = k * Math.sin(angle);
        velocity += acceleration * tsec;
        angle += velocity * tsec;
        angle *= coeffT;
        callback(angle, pLen);
      }, tstep);
    }

    let canvas = document.getElementById("pendCanvas");
    let context = canvas.getContext("2d");

    let prev = 0;
    let simId = 1;

    function myAngle(angle, pLen) {
      let size = Math.min(canvas.width, canvas.height);
      let rPend = size * pLen; //длина плеча маятника
      let rBar = size * 0.007; //толшина плеча маятника
      let rBall = size * 0.05; //размер шарика

      context.globalCompositeOperation = "destination-out";

      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#0d6efd";
      context.strokeStyle =
        "rgba(0,0,0," + Math.max(0, 1 - Math.abs(prev - angle) * 10) + ")";
      context.globalCompositeOperation = "source-over";
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(angle);
      context.beginPath();
      context.rect(-rBar, -rBar, rBar * 2, rPend + rBar * 2);

      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(0, rPend, rBall, 0, Math.PI * 2, false);
      context.fill();
      context.stroke();
      context.restore();
      prev = angle;
    }

    simId = Simulation(0.75, 9.80665, Math.PI * angl, 10, myAngle);

    return () => {
      clearInterval(simId);
      simId = null;
    };
  }, [angl,pLen]);

  return (
    <div id="center">
      <canvas id="pendCanvas" width="400" height="400"></canvas>
    </div>
  );
}

export default Pendelum;
