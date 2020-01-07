class templateFactory {
    constructor() {
        this.templates = {}
    }

    registerTemplate(name, templateHandler, ingoreExists) {
        if (this.templates[name]) {
            if (ingoreExists) {
                return
            }
            else {
                throw `template existed. name: ${name}`
            }
        }
        this.templates[name] = templateHandler
    }

    registerTemplates(templates) {
        if (!templates || templates.length == 0)
            return
        templates.forEach(t => this.registerTemplate(t.name, t.templateHandler))
    }

    getTemplate(name) {
        if (!name)
            throw 'template name can not null'
        var template = this.templates[name]
        return template
    }
}

const instance = new templateFactory()

export default instance