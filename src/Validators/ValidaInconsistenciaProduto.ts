import { TipoDeProdutoEnum } from "src/Enums/tipoDeProdutoEnum";
import { Produto } from "src/Produto/produto.entity";

export function ValidaInconsistenciaProduto(produto: Produto){
  
  if(!produto.Tipo)
    return `O campo tipo possui os seguintes valores possíveis ${TipoDeProdutoEnum.SIMPLES}, ${TipoDeProdutoEnum.CONFIGURAVEL}, ${TipoDeProdutoEnum.DIGITAL}, ${TipoDeProdutoEnum.AGRUPADO}`;      

  if(produto.Tipo !== TipoDeProdutoEnum.DIGITAL.toString() && produto.LinkParaDownload)  
    return `O linkParaDownload só pode ser informado para produtos do tipo: ${TipoDeProdutoEnum.DIGITAL} `;
  
  if(produto.Tipo !== TipoDeProdutoEnum.CONFIGURAVEL.toString() && (produto.Caracteristicas && produto.Caracteristicas.length > 0)) 
    return `As caracteristicas só podem ser informadas para produtos do tipo: ${TipoDeProdutoEnum.CONFIGURAVEL} `;

  switch (produto.Tipo) {
    case 'Simples':    
      break;

    case 'Agrupado':
      if(!produto.Agrupamento || produto.Agrupamento.length == 0)
        return `É obrigatório informar os agrupamentos para produto do tipo: Agrupado`;
      break;

    case 'Digital':
      if(!produto.LinkParaDownload)  
        return `O linkParaDownload deve ser informado para produtos do tipo: ${TipoDeProdutoEnum.DIGITAL} `;

      if(produto.Caracteristicas && produto.Caracteristicas.length > 0)    
        return `As caracteristicas não podem ser informadas para produtos do tipo: ${TipoDeProdutoEnum.DIGITAL} `;

      break;
  
    case 'Configuravel':
      if(!produto.Caracteristicas || produto.Caracteristicas.length < 2)  
        return `É necessário informar ao menos 2 caracteristicas para produtos do tipo: ${TipoDeProdutoEnum.CONFIGURAVEL} `;

      break;
    
      default:
      return `O campo tipo possui os seguintes valores possíveis ${TipoDeProdutoEnum.SIMPLES}, ${TipoDeProdutoEnum.CONFIGURAVEL}, ${TipoDeProdutoEnum.DIGITAL}, ${TipoDeProdutoEnum.AGRUPADO}`;      
  }

  return false;
}    
    