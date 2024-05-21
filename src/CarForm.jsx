import PropTypes from "prop-types";
import { useRef, useState } from "react";

function CarForm(props) {
    const { onSuccess } = props;
    const license_plate_number = useRef(null);
    const brand = useRef(null);
    const model = useRef(null);
    const url = "http://localhost:8000/api/cars";
    const daily_cost = useRef(null);
    const [ error, setError ] = useState("");



    const handleSubmit = event => {
        event.preventDefault();
        createCar();

    }

    const createCar = async () => {
        const car = {
            license_plate_number: license_plate_number.current.value,
            brand: brand.current.value,
            model: model.current.value,
            daily_cost: daily_cost.current.value,
        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(car),
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        if (response.ok) {
            clearForm();
            onSuccess();
        } else {
            const data = await response.json();
            setError(data.message);
        }

    }
    const clearForm = () => {
        license_plate_number.current.value = "";
        brand.current.value = "";
        model.current.value = "";
        daily_cost.current.value = "";
        setError("");
    }

    return (<form onSubmit={handleSubmit}>
        <h2> Új Autó felvétele</h2>
        {error != "" ? (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        ) : (
            ""
        )}
        <div className="mb-3">
            <label htmlFor="license_plate_number" className="form-label">Rendszám</label>
            <input type="text" id="license_plate_number" className="form-control" ref={license_plate_number} />
        </div>
        <div className="mb-3">
            <label htmlFor="brand" className="form-label">Márka</label>
            <input type="text" id="brand" className="form-control" ref={brand} />
        </div>
        <div className="mb-3">
            <label htmlFor="model" className="form-label">Modell</label>
            <input type="text" id="model" className="form-control" ref={model} />
        </div>
        <div className="mb-3">
            <label htmlFor="daily_cost" className="form-label">Napidíj</label>
            <input type="number" id="daily_cost" className="form-control" ref={daily_cost} />
        </div>

        <button className="btn btn-primary" type="submit">Új autó felvétele</button>
    </form>);
}

CarForm.propTypes = {
    onSuccess: PropTypes.func.isRequired
}

export default CarForm;