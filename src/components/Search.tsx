import { FunctionComponent, useEffect, useState } from "react";
import { Token } from "tokenizr";
import { tokenize } from "../tokenize";

const Search: FunctionComponent = () => {
  const [rawInput, setRawInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    try {
      const tokens = tokenize(rawInput);
      setTokens(tokens);
      setError(false);
    } catch {
      setError(true);
    }
  }, [rawInput]);

  return (
    <div className="search-container">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            🪙
          </span>
        </div>
        <input
          type="text"
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder="search"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onChange={(e) => setRawInput(e.currentTarget.value)}
        />
      </div>

      <div>
        <p>
          <b>Raw Input: </b> {rawInput}
        </p>

        <b>Tokens: </b>
        {tokens.slice(0, -1).map((t) => (
          <div key={t.pos} style={{ display: "flex", alignItems: "center" }}>
            <div
              className={`btn btn-${
                t.type === "term" ? "primary" : "warning"
              } my-2 me-2`}
            >
              {t.type}
            </div>
            <div>{t.value}</div>
          </div>
        ))}
      </div>
      <a
        href="https://gitub.com/jhsul"
        target="_blank"
        style={{ alignSelf: "center" }}
      >
        source code
      </a>
    </div>
  );
};

export default Search;
