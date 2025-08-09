/**
 * Taxonomia de categorias para Prestadores de Serviço e ramos para Lojas.
 * Use sempre esses arrays para consistência entre UI e banco de dados.
 */
export const serviceCategories: string[] = [
  'Informática',
  'Eletricista',
  'Mecânico',
  'Diarista',
  'Encanador',
  'Pintor',
  'Pedreiro',
  'Jardinagem',
  'Doces',
  'Produtos Caseiros',
  'Produtor Agrícola',
  'Aulas Particulares',
  'Beleza e Estética',
];

export const shopBranches: string[] = [
  'Lojas de Roupas',
  'Lojas de Calçados',
  'Papelaria',
  'Mercado/Armazém',
  'Açougue',
  'Farmácia',
  'Materiais de Construção',
  'Agropecuária',
  'Loja de Informática',
  'Autopeças',
  'Loja de Utilidades',
];

/** Chips sugeridos para filtro na listagem (combina serviço + lojas). */
export const filterChips: string[] = ['Todos', ...serviceCategories, ...shopBranches];


