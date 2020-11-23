import {expect} from 'chai';

describe('DOCTOR SEARCH', () => {
  before('should open docdoc.ru/doctor', () => {
    browser.url('https://docdoc.ru/doctor');
    browser.maximizeWindow();
  });

  it('should verify that there are 10 doctors on a page', () => {
    expect(browser.$$('//div[@data-test-id="doctor-card-search-results"]').length).eq(10);
  });

  it('should verify that `select dates` element is displayed', () => {
    browser.$('//button[@data-test-id="calendar-button"]').scrollIntoView();
    browser.$('//button[@data-test-id="calendar-button"]').click();
    expect(browser.$('//div[@data-test-id="date_select_items"]').isDisplayed()).true;
  });

  it('should verify that `Все дни` is selected', () => {
    const elementClass = browser.$('//button[@data-test-id="date_select"]').getAttribute('class');
    expect(elementClass.includes('active')).true;
  });

  it('should click `Завтра` and verify that sort button label is correct', () => {
    // 2nd option: browser.$('//button[@data-test-id="calendar-item.1"]').click();
    browser.$('//button//*[contains(text(),"Завтра")]').click();
    browser.$('//*[contains(text(),"Онлайн-расписание на")]').isDisplayed(30000);
    expect(browser.$('//button[@data-test-id="calendar-button"]').getText()).eq('Расписание на завтра');
  });

  it('should verify that 10 doctors show on the page', () => {
    expect(browser.$$('//div[@data-test-id="doctor-card-search-results"]').length).eq(10);
  });

  it('should verify that displayed all doctors work on selected date', () => {
    const allDoctors = browser.$$('//div[@data-test-id="doctor-card-search-results"]');
    for (let i = 1; i <= allDoctors.length; i++){
      //browser.$(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//div[@class="slots-buttons__item"][1]`).waitForDisplayed();
      browser.pause(800);
      //const allBooked = browser.$(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//span[@class="clinic-slots__caption-date"]`).getText();
      //console.log('textttttttttttttt '+ i + '   ' +allBooked);
      try{
        browser.pause(800);
        const timeSlotsCount = $$(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//button[@data-ga-action="clickTable"]`).length;
        console.log('nrrrrrrrrrrrr ' + i +  '   ' + timeSlotsCount);
        expect(timeSlotsCount).to.be.above(0);
      } catch (e) {
        //const allBooked = browser.$(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//span[@class="clinic-slots__caption-date"]`).getText();
        //console.log('texttttttttttt' + i+'  '+allBooked);
        expect(browser.$(`(//div[@data-test-id="doctor-card-search-results"])[${i}]//span[@class="clinic-slots__caption-date"]`).getText()).to.include('У врача все занято');
      }
    }
  });
});
