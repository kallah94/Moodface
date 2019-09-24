import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MoodComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-mood div table .btn-danger'));
  title = element.all(by.css('jhi-mood div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class MoodUpdatePage {
  pageTitle = element(by.id('jhi-mood-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  commentaireInput = element(by.id('field_commentaire'));
  moodSelect = element(by.id('field_mood'));
  agentSelect = element(by.id('field_agent'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCommentaireInput(commentaire) {
    await this.commentaireInput.sendKeys(commentaire);
  }

  async getCommentaireInput() {
    return await this.commentaireInput.getAttribute('value');
  }

  async setMoodSelect(mood) {
    await this.moodSelect.sendKeys(mood);
  }

  async getMoodSelect() {
    return await this.moodSelect.element(by.css('option:checked')).getText();
  }

  async moodSelectLastOption(timeout?: number) {
    await this.moodSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async agentSelectLastOption(timeout?: number) {
    await this.agentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async agentSelectOption(option) {
    await this.agentSelect.sendKeys(option);
  }

  getAgentSelect(): ElementFinder {
    return this.agentSelect;
  }

  async getAgentSelectedOption() {
    return await this.agentSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MoodDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mood-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mood'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
