const { Builder, Capabilities, By } = require("selenium-webdriver")

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await (await driver).get('http://127.0.0.1:5500/movie-list/index.html')
  })
 
afterAll(async () => {
    await (await driver).quit()
  })

test('able to add a movie to the list', async () => {
await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('The Lion King');
await driver.findElement(By.xpath('//button[text()="Add"]')).click();
const movie = await driver.findElement(By.xpath('//span[text()="The Lion King"]'));
const isDisplayed = await movie.isDisplayed();
expect(isDisplayed).toBeTruthy();
})

test('to cross off the movie', async () => {
await driver.findElement(By.xpath('//span[text()="The Lion King"]')).click()
await driver.findElement(By.xpath('//*[@id="message"]'))
const message = await driver.findElement(By.xpath('//*[@id="message"]'))
const isDisplayed = await message.isDisplayed()
expect(isDisplayed).toBeTruthy()
})

test('add another movie to the list', async () => {
await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys('The Gladiator')
await driver.findElement(By.xpath('//button[text()="Add"]')).click()
const movie = await driver.findElement(By.xpath('//span[text()="The Gladiator"]'))
const isDisplayed = await movie.isDisplayed()
expect(isDisplayed).toBeTruthy()
})

test('to delete movies', async () =>{
await driver.findElement(By.xpath('//button[text()="x"][1]')).click();
await driver.findElement(By.xpath('//button[text()="x"][1]')).click();
const movies = await driver.findElements(By.xpath('//ul/*'))
console.log(movies);
expect(movies.length).toBe(0)
})  