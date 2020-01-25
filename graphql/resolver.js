const Tobacco = require('../models/tobacco')
const validator = require('validator')
const isValid = (input) => input.split(' ').every(str => {return validator.isAlpha(str)})
module.exports = {
    async addTobacco({ name }) {
        try{
            const tobacco = await Tobacco.find({ name })
            if (tobacco.length > 0) {
                return 'Такой табак уже есть'
            } else {
                const tobacco = await new Tobacco({ name })
                if (isValid(name)) {
                    await tobacco.save()
                    return 'Табак добавлен'
                } else {
                    return 'Проверьте правильность ввода (Только англ. названия)'
                }
            }
        } catch(e) {
            console.log(e)
        }
    },    
    async getAll() {
        try{
            const tobacco = await Tobacco.find({})
            if (tobacco) {
                return tobacco
            } else {
                return 'Такой табак не найден - ' + name
            }
        } catch(e) {
            console.log(e)
        }
    },
    async getCount({ name }) {
        try{
            const tobacco = await Tobacco.findOne({ name })
            if (tobacco) {
                return tobacco.count.toString()
            } else {
                return 'Такой табак не найден - ' + name
            }
        } catch(e) {
            console.log(e)
        }
    },
    async removeTabacco({ name }) {
        try{
            const tobacco = await Tobacco.findOne({ name })
            if (tobacco) {
                await tobacco.remove()
                return 'Удалили - ' + name
            } else {
                return 'Такой табак не найден - ' + name
            }
        } catch(e) {
            console.log(e)
        }
    },
    async increaseCount({ name, count }) {
        try{
            if (!validator.isInt(count.toString(), {min: 1})) return 'Ошибка: Неверное количество'
            const tobacco = await Tobacco.findOne({ name })
            if (tobacco) {
                tobacco.count += +count
                await tobacco.save()
                return 'Добавили новое количество к табаку ' + name + ' - ' + count + '. Всего - ' + tobacco.count
            } else {
                return 'Такой табак не найден - ' + name
            }
        } catch(e) {
            console.log(e)
        }
    },
    async decreaseCount({ name, count }) {
        try{
            if (!validator.isInt(count.toString(), {min: 1})) return 'Ошибка: Неверное количество'
            const tobacco = await Tobacco.findOne({ name })
            if (tobacco) {
                tobacco.count -= +count
                await tobacco.save()
                return 'Убрали количество табака ' + name + ' - ' + count + '. Всего осталось - ' + tobacco.count
            } else {
                return 'Такой табак не найден - ' + name
            }
        } catch(e) {
            console.log(e)
        }
    }
}