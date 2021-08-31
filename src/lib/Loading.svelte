<div>
    <svg viewBox="0 0 100 100">

    <foreignObject class="logoBack"  x="0" y="0" width="100" height="100">
      <div class="logoGradient" xmlns="http://www.w3.org/1999/xhtml"></div>
    </foreignObject>

    <g class="logoBlend">
        <rect x="0" y="0" width="100" height="100" />
        <path d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" />
    </g>
</svg>
</div>


<style>
    div{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    svg {
  max-width: 100px;
  transform: rotate(180deg);

}

foreignObject.logoBack {
  transform: rotate(270deg);
  transform-origin: 50px 50px;
}

div.logoGradient {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #706FD3; 
}

g.logoBlend {
  mix-blend-mode: lighten;
}

g.logoBlend > rect {
  fill: white;
}

g.logoBlend > path {
  stroke: black;
  stroke-width: 8;
  stroke-dasharray: 288.5;
  stroke-dashoffset: -288.5;
  stroke-linecap: round;
  fill: none;
  transform-origin: 50px 50px;
  animation: pathStroke 3.75s 0.5s infinite ease-in-out;
}


@keyframes colorRotate {
  from { transform: rotate(270deg); }
  to { transform: rotate(-90deg); }
}

@keyframes pathStroke {
  0% { stroke-dashoffset: 288.5; }
  20%, 70% { stroke-dashoffset: 577; }
  100% { stroke-dashoffset: 865.5; }
}

</style>