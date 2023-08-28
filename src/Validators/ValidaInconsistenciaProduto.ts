import { TipoDeProdutoEnum } from "src/Enums/tipoDeProdutoEnum";
import { Produto } from "src/Produto/produto.entity";

export function ValidaInconsistenciaProduto(produto: Produto){
  if(!produto.Tipo)
    return 'Tipo não informado';
  
  switch (produto.Tipo) {
    case TipoDeProdutoEnum.DIGITAL:
      if(!produto.LinkParaDownload)  
        return `O linkParaDownload deve ser informado para produtos do tipo: ${TipoDeProdutoEnum.DIGITAL} `;

      if(produto.Caracteristicas && produto.Caracteristicas.length > 0)    
        return `As caracteristicas não podem ser informadas para produtos do tipo: ${TipoDeProdutoEnum.DIGITAL} `;

      break;
  
    case TipoDeProdutoEnum.CONFIGURAVEL:
      if(!produto.Caracteristicas || produto.Caracteristicas.length < 2)  
        return `É necessário informar ao menos 2 caracteristicas para produtos do tipo: ${TipoDeProdutoEnum.CONFIGURAVEL} `;
      
      if(produto.LinkParaDownload)  
        return `O linkParaDownload não pode ser informado para produtos do tipo: ${TipoDeProdutoEnum.CONFIGURAVEL} `;

      break;
    
    default:
      return false;
      break;
  }

  return false;
}    
    