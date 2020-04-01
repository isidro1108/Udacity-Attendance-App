// attendance data
var model = {
    studentList: ['Slappy the Frog',
                'Lilly the Lizard',
                'Paulrus the Walrus',
                'Gregory the Goat',
                'Adam the Anaconda']
}

// My octopus code
var controller = {
    init: function() {
        view.init()
    },
    returnStudentList: function() {
        return model.studentList
    }
}

// attendance view
var view = {
    table: document.getElementById('t-attendance'),
    thead: document.querySelector('#t-attendance thead'),
    tbody: document.querySelector('#t-attendance tbody'),
    students: document.getElementsByClassName('student'),
    checkboxes: document.getElementsByClassName('checkbox'),
    init: function() {
        let studentList = controller.returnStudentList(),
            container = document.createDocumentFragment(),
            row = 1
        for (let student of studentList) {
            let newTr = document.createElement('tr'),
                newTd = document.createElement('td')
            newTr.className = 'student'
            newTd.textContent = student
            newTd.className = 'name-col'
            newTr.appendChild(newTd)
            for (let column = 1; column <= 12; column++) {
                let newTd = document.createElement('td'),
                    newCheck = document.createElement('input')
                newCheck.type = 'checkbox'
                newCheck.addEventListener('click', function() {
                    view.render()
                })
                newTd.className = 'checkbox row' + row + ' column' + column
                newTd.appendChild(newCheck)
                newTr.appendChild(newTd)
            }
            let missedCol = document.createElement('td')
            missedCol.textContent = 12
            missedCol.className = 'missed-col'
            newTr.appendChild(missedCol)
            container.appendChild(newTr)
            row++
        }
        this.tbody.appendChild(container)
    },
    render: function() {
        let nrow = 1
        for (let row of this.students) {
            let checksInRow = document.getElementsByClassName('row' + nrow),
                totalDays = 0
            for (let check of checksInRow) {
                if (check.firstElementChild.checked) {
                    totalDays++
                }
            }
            nrow++
            row.lastElementChild.textContent = 12 - totalDays
        }
    }
}

controller.init()