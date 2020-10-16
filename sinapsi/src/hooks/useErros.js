import { useState } from 'react';

function useErros(validacoes) {
  const [erros, setErros] = useState(
    {
      codigo: { valido: true, texto: "" },
      codigoRede: { valido: true, texto: "" },
      latitude: { valido: true, texto: "" },
      longitude: { valido: true, texto: "" }
    }
  );

  async function validarCampos(event) {
    const { name, value } = event.target;
    const novoEstado = { ...erros};
    novoEstado[name] = await validacoes[name](value);
    setErros(novoEstado)
  }

  return [erros, validarCampos];
}

export default useErros;
