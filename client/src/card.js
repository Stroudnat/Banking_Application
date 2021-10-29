function Card(props){
    var classes = () =>{
        const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
        const txt = props.textcolor ? ' text-' + props.textcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    };
    var style = () =>{
        const maxWidth = '18rem';
        const margin = props.margin;
        return {maxWidth, margin};
    };
    return(
        <div className={classes()} style={style()}>
            <div className="card-header">{props.header}</div>
            <div className="card-body">
                {/* the "&&" is a conditional statement for elements if it is or isnt there */}
                {props.title && (<h5 className="card-title">{props.title}</h5>)} 
                {props.text && (<h5 className="card-text">{props.text}</h5>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
            </div>
        </div>
    )
}

export default Card;