import { Directive, EventEmitter, Input, Output } from '@angular/core';

import { convertToBoolean } from '../../../utils/util';

/**
 * @description
 *
 * O componente `po-page-slide` é utilizado para incluir conteúdos secundários
 * adicionando controles e navegações adicionais, mas mantendo o usuário na
 * página principal.
 *
 * Este componente é ativado a partir do método `#open()` e pode ser  encerrado
 * através do botão que encontra-se no cabeçalho do mesmo ou através do método
 * `#close()`.
 *
 * > Para o correto funcionamento do componente `po-page-slide`, deve ser
 * > importado o módulo `BrowserAnimationsModule` no módulo principal da sua
 * > aplicação.
 *
 *  Caso utilize componentes de field dentro do page-slide, recomenda-se o uso do [Grid System](https://po-ui.io/guides/grid-system).
 */
@Directive()
export class PoPageSlideBaseComponent {
  /**
   * @description
   *
   * Título da página.
   */
  @Input('p-title') title: string;

  /**
   * @description
   *
   * Subtítulo da página.
   */
  @Input('p-subtitle') subtitle?: string;

  /**
   * @optional
   *
   * @description
   *
   * Oculta o botão de encerramento da página.
   *
   * Esta opção só é possível se a propriedade `p-click-out` estiver habilitada.
   *
   * @default `false`
   */
  @Input({ alias: 'p-hide-close', transform: convertToBoolean }) hideClose: boolean = false;

  /**
   * @optional
   *
   * @description
   *
   * Define se permite o encerramento da página ao clicar fora da mesma.
   *
   * @default `false`
   */
  @Input({ alias: 'p-click-out', transform: convertToBoolean }) clickOut: boolean = false;

  /**
   * @optional
   *
   * @description
   *
   * Permite a expansão dinâmica da largura do `po-page-slide` quando `p-size` for `auto` (automático).
   * Propriedade necessária para correto funcionamento da `po-table` dentro do `po-page-slide`
   *
   * @default `false`
   */
  @Input({ alias: 'p-flexible-width', transform: convertToBoolean }) flexibleWidth: boolean = false;

  /**
   * @optional
   *
   * @description
   * Evento executado ao fechar o page slide.
   */
  @Output('p-close') closePageSlide: EventEmitter<any> = new EventEmitter<any>();

  // Controla se a página está ou não oculta, por padrão é oculto.
  public hidden = true;

  private _size = 'md';

  /**
   * @optional
   *
   * @description
   *
   * Define o tamanho da página.
   *
   * Valores válidos:
   *  - `sm` (pequeno)
   *  - `md` (médio)
   *  - `lg` (grande)
   *  - `xl` (extra-grande)
   *  - `auto` (automático)
   *
   * > Todas as opções de tamanho, exceto `auto`, possuem uma largura máxima de **768px**.
   *
   * @default `md`
   */
  @Input('p-size') set size(value: string) {
    const sizes = ['sm', 'md', 'lg', 'xl', 'auto'];
    this._size = sizes.indexOf(value) > -1 ? value : 'md';
  }

  get size() {
    return this._size;
  }

  /**
   * Ativa a visualização da página.
   *
   * Para utilizá-la é necessário ter a instância do componente no DOM, podendo
   * ser utilizado o `ViewChild` da seguinte forma:
   *
   * ```typescript
   * import { PoPageSlideComponent } from '@po/ng-components';
   *
   * ...
   *
   * @ViewChild(PoPageSlideComponent, { static: true }) pageSlide: PoPageSlideComponent;
   *
   * public openPage() {
   *   this.pageSlide.open();
   * }
   * ```
   */
  public open() {
    // Evita com que a página seja aberta sem que seja possível fechá-la.
    if (this.hideClose && !this.clickOut) {
      this.hideClose = false;
    }

    this.hidden = false;
  }

  /**
   * Encerra a visualização da página.
   *
   * Para utilizá-la é necessário ter a instância do componente no DOM, podendo
   * ser utilizado o `ViewChild` da seguinte forma:
   *
   * ```typescript
   * import { PoPageSlideComponent } from '@po-ui/ng-components';
   *
   * ...
   *
   * @ViewChild(PoPageSlideComponent, { static: true }) pageSlide: PoPageSlideComponent;
   *
   * public closePage() {
   *   this.pageSlide.close();
   * }
   * ```
   */
  public close(): void {
    this.hidden = true;
    this.closePageSlide.emit();
  }
}
