import { useContext } from "react";
import { Details } from "./DetailsProvider";
import styles from "./Form.module.css";
function Form() {
  const {
    location,
    setLocation,
    setSearch,
    isErrorCoords,
    coordsError,
    isLoadingCoords,
  } = useContext(Details);

  function handleSubmission(e) {
    e.preventDefault();
    if (location.trim()) {
      setSearch(location);
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>How's the sky looking today?</p>
      <form className={styles.form} onSubmit={handleSubmission}>
        <input
          className={styles.input}
          type="text"
          value={location}
          placeholder=" Search for a place,country..."
          onChange={(e) => setLocation(e.target.value)}
          disabled={isLoadingCoords}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isLoadingCoords || !location.trim()}
        >
          {isLoadingCoords ? "Searching..." : "Search"}
        </button>
      </form>
      {isErrorCoords && coordsError && (
        <div className={styles.error}>
          <p>⚠️ {coordsError.message || "Location not found. Please try again."}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
