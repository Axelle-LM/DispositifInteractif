uniform sampler2D uMap;

varying vec2 vUv;

void main() {
  vec4 texture = texture2D(uMap, vUv);

  //gl_FragColor = vec4(255.0, 0.0, 0.0, 255.0);

  gl_FragColor = texture;

}