export class BasicCharacterControllerInput
{

    _keys:any = {}

    constructor() {
        this._Init();    
      }
    
      _Init() {
        this._keys = {
          forward: false,
          backward: false,
          left: false,
          right: false,
          space: false,
          shift: false,
        };
        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
      }
    
      _onKeyDown(event:any) {
        console.log('onKeyDown')
        switch (event.keyCode) {
          case 87: // w
            this._keys.forward = true;
            break;
          case 65: // a
            this._keys.left = true;
            break;
          case 83: // s
            this._keys.backward = true;
            break;
          case 68: // d
            this._keys.right = true;
            break;
          case 32: // SPACE
            this._keys.space = true;
            break;
          case 16: // SHIFT
            this._keys.shift = true;
            break;
        }
      }
    
      _onKeyUp(event:any) {
        console.log('onKeyUp')
        switch(event.keyCode) {
          case 87: // w
            this._keys.forward = false;
            break;
          case 65: // a
            this._keys.left = false;
            break;
          case 83: // s
            this._keys.backward = false;
            break;
          case 68: // d
            this._keys.right = false;
            break;
          case 32: // SPACE
            this._keys.space = false;
            break;
          case 16: // SHIFT
            this._keys.shift = false;
            break;
        }
      }

}