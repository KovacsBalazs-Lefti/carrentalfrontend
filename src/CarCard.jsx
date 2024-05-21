import PropTypes from "prop-types";



function CarCard(props) {
    const {car} = props;
    const url = "http://localhost:8000/api/cars";

    const rent = async () => {
        const response = await fetch(url + "/" + car.id + "/rent", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        });
        if (response.ok){
            alert("Sikeres foglalás");
        }else {
            const data = await response.json();
            alert(data.message);
        }
    }


   return ( 
   <div className="col-card">
    <div className="card-body">
        <h2>{car.license_plate_number}</h2>
        <p> Márka:{car.brand}</p>
        <p>Model:{car.model}</p>
        <p>Napi díj:{car.daily_cost} Ft</p>
        <img className="img-fluid" src={"images/"+ car.brand.toLowerCase() + "_" + car.model.toLowerCase()  + ".png"} alt={car.model} />
    </div>
    <button className="btn btn-secondary" style={{width: "100%"}} onClick={() =>rent()}>Kölcsönzés</button>
    </div>
    );
}

CarCard.propTypes = {
    car: PropTypes.object.isRequired
} 

export default CarCard;