export default function Point (XPosition, YPosition){

    this.XPosition = XPosition;
    this.YPosition = YPosition;

    const equals = (obj) => {
        return this.XPosition === obj.XPosition && this.YPosition === obj.YPosition;
    }

}