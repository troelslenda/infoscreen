import { InfoScreenPerson } from "@infoscreen/shared";

const personService = {
    persons: <InfoScreenPerson[]>[],
    addPerson: (person) => {
        personService.persons.push(<InfoScreenPerson>{ ...person})
    },
    getPersonByPath(path: string): InfoScreenPerson {
        return personService.persons.find(person => person.navigationUrl === path);
    }
}

export default personService;