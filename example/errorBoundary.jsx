/*eslint-disable */

import React, { useEffect, useState } from "react"

const s = {
  style: {
    fontSize: '60px'
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erro
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      return <p>Algo deu errado</p>;
    }

    return this.props.children;
  }
}

const ItWillThrowError = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (counter > 3) {
      throw new Error('Maior que 3')
    }
  }, [counter])

  return (
    <div>
      <button {...s} onClick={() => setCounter((s) => s + 1)}>Click to increase {counter}</button>
    </div>
  )
}

export const Home = () => {
  return (
    <div {...s}>
      <ErrorBoundary>
        <ItWillThrowError />
      </ErrorBoundary>
    </div>
  )
}
