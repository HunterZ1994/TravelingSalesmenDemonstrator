export default function Point (XPosition, YPosition){

    this.x_coordinate = XPosition;
    this.y_coordinate = YPosition;

    const equals = (obj) => {
        return this.x_coordinate === obj.x_coordinate && this.y_coordinate === obj.y_coordinate;
    }

}