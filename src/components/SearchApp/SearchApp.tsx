import React, { ReactNode } from "react";

interface SearchAppState {
  searchTerm: string;
  searchResults: Character[];
  isLoading: boolean;
  hasError: boolean;
}

interface Character {
  id: number;
  name: string;
  image: string;
}

interface SearchAppProps {}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleButtonClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Something went wrong. There is an error in the component.
          <button onClick={this.handleButtonClick}>
            Trigger Error Manually
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

class SearchApp extends React.Component<SearchAppProps, SearchAppState> {
  constructor(props: SearchAppProps) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      isLoading: false,
      hasError: false,
    };
  }

  handleSearch = async () => {
    try {
      this.setState({ isLoading: true, hasError: false }); // Сбрасываем ошибку перед новым запросом

      const { searchTerm } = this.state;
      let data;
      if (searchTerm) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchTerm}`,
        );
        data = await response.json();

        const searchResults: Character[] = data.results.map(
          (result: Character) => ({
            id: result.id,
            name: result.name,
            image: result.image,
          }),
        );

        this.setState({ searchResults, isLoading: false });
      } else {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character",
        );
        data = await response.json();

        const searchResults: Character[] = data.results.map(
          (result: Character) => ({
            id: result.id,
            name: result.name,
            image: result.image,
          }),
        );

        this.setState({ searchResults, isLoading: false });
      }
    } catch (error) {
      console.error("Error while receiving data", error);
      this.setState({ hasError: true, isLoading: false });
    }
  };

  triggerError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { searchResults, hasError } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <input
                type="text"
                value={this.state.searchTerm}
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                placeholder="Enter your search term"
              />
              <button className="search-btn" onClick={this.handleSearch}>
                Search
              </button>
              <button className="error-btn" onClick={this.triggerError}>
                Trigger Error
              </button>
            </div>
            <div className="results-body">
              {hasError ? (
                <div>
                  Something went wrong. There is an error in the component.
                </div>
              ) : (
                searchResults.map((result: Character) => (
                  <div className="card" key={result.id}>
                    <img src={result.image} alt={result.name} />
                    <p className="name">{result.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default SearchApp;
