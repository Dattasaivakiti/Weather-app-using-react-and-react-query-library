import { useContext } from "react";
import { Details } from "./DetailsProvider";
import styles from "./Form.module.css";
function Form() {
  const {
    location,
    setLocation,
    setSearch,
    search,
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

  // Only disable input when actively searching (has search query AND is loading)
  const isSearching = isLoadingCoords && search.trim();

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
          disabled={isSearching}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isSearching || !location.trim()}
        >
          {isSearching ? "Searching..." : "Search"}
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
