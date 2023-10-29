import React, { ReactNode } from "react";

interface SearchAppState {
  searchTerm: string;
  searchResult: Character | null;
  hasError: boolean;
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
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

  render() {
    if (this.state.hasError) {
      return <div>Что-то пошло не так. Ошибка в компоненте.</div>;
    }

    return this.props.children;
  }
}

class SearchApp extends React.Component<SearchAppProps, SearchAppState> {
  constructor(props: SearchAppProps) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResult: null,
      hasError: false,
    };
  }

  handleSearch = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      const firstCharacter: Character = {
        id: data.results[0].id,
        name: data.results[0].name,
        image: data.results[0].image,
        status: data.results[0].status,
        species: data.results[0].species,
      };

      localStorage.setItem("savedSearch", JSON.stringify(firstCharacter));
      this.setState({ searchResult: firstCharacter });
    } catch (error) {
      console.error("Ошибка при получении данных", error);
      this.setState({ hasError: true });
    }
  };

  render() {
    const { searchResult, hasError } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <input
                type="text"
                value={this.state.searchTerm}
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                placeholder="Введите поисковый запрос"
              />
              <button onClick={this.handleSearch}>Поиск</button>
            </div>
            <div>
              {hasError ? (
                <div>Что-то пошло не так. Ошибка в компоненте.</div>
              ) : (
                searchResult && (
                  <div>
                    <img src={searchResult.image} alt={searchResult.name} />
                    <p>{searchResult.name}</p>
                    <p>
                      {searchResult.status} - {searchResult.species}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            {/* Другие компоненты или контент ниже, если необходимо */}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default SearchApp;
