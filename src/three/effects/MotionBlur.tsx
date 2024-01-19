
// Fragment Shader
import {Effect} from "postprocessing";
import {Uniform} from "three";
import {forwardRef, useMemo} from "react";

const fragmentShader = ` varying vec2 vUv;
    uniform float time;
    void main() {
      // implement the blending here
      float r = 0.5 + 0.5 * cos(time);
      gl_FragColor = vec4(r, 0.0, 0.0, 1.0);
    }`; // Here you have to define your motion blur shader code

let _uParam: number;

class MyCustomEffectImpl extends Effect {
  constructor({ param = 0.1 } = {}) {
    super('MyCustomEffect', fragmentShader, {
      uniforms: new Map([['param', new Uniform(param)]]),
    });

    _uParam = param;
  }

  update(renderer: any, inputBuffer: any, deltaTime: any) {
    this.uniforms.get('param').value = _uParam;
  }
}

export const MyCustomEffect = forwardRef(({ param }, ref) => {
  const effect = useMemo(() => new MyCustomEffectImpl({ param }), [param]);
  return <primitive ref={ref} object={effect} dispose={null} />
});