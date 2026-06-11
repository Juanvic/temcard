import { useEffect, useState } from "react";
import "./Temcard.css";

function Temcard() {
  const [temtemName, setTemtemName] = useState("Temtem Name");
  const [temtemNumber, setTemtemNumber] = useState("001");
  const [temtemImageSrc, setTemtemImageSrc] = useState("");
  const [searchTemtem, setSearchTemtem] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formatTemtemNumber = (number) => String(number).padStart(3, "0");

  const fetchTemtem = async (temtemId) => {
    const response = await fetch(
      `https://temtem-api.mael.tech/api/temtems/${temtemId}`,
    );
    if (!response.ok) return null;
    return response.json();
  };

  const loadTemtem = async (temtemId) => {
    setIsLoading(true);
    setError("");

    const data = await fetchTemtem(temtemId);
    if (!data) {
      setTemtemImageSrc("");
      setTemtemName("Not found");
      setTemtemNumber("000");
      setError("Temtem not found");
      setIsLoading(false);
      return;
    }

    const formattedNumber = formatTemtemNumber(data.number);
    setTemtemName(data.name);
    setTemtemNumber(formattedNumber);
    setTemtemImageSrc(
      `https://tem.team/static/images/temtem/regular/${formattedNumber}.png`,
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadTemtem(searchTemtem);
  }, [searchTemtem]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = Number(inputValue);
    if (id > 0) {
      setSearchTemtem(id);
      setInputValue("");
    }
  };

  const handlePrev = () => {
    setSearchTemtem((current) => Math.max(current - 1, 1));
  };

  const handleNext = () => {
    setSearchTemtem((current) => current + 1);
  };

  return (
    <main className="page">
      <div className="temcard">
        <h1 className="card_title">Temcard</h1>
        <div className="card_frame">
          <img
            src="https://static.wikia.nocookie.net/temtem_gamepedia_en/images/8/81/TemCardPlus_render.png/revision/latest?cb=20190628153720"
            alt="temcard"
            className="card_image"
            loading="lazy"
          />
          {temtemImageSrc && (
            <img
              src={temtemImageSrc}
              alt={temtemName}
              className="temtem_image"
            />
          )}
        </div>

        <div className="container">
          <h1 className="temtem_data">
            {isLoading && <p className="status">Loading...</p>}
            {error && <p className="status error">{error}</p>}
            <span className="temtem_number">{temtemNumber} - </span>
            <span className="temtem_name">{temtemName}</span>
          </h1>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            type="search"
            className="input_search"
            placeholder="Number"
            required
          />
        </form>

        <div className="buttons">
          <button
            type="button"
            className="button btn-prev"
            onClick={handlePrev}
          >
            Prev &lt;
          </button>
          <button
            type="button"
            className="button btn-next"
            onClick={handleNext}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </main>
  );
}

export default Temcard;
