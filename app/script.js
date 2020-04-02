// attendance data
var model = {
    studentList: ['Slappy the Frog',
                'Lilly the Lizard',
                'Paulrus the Walrus',
                'Gregory the Goat',
                'Adam the Anaconda'],
    
    createAttendanceRecord: function() {
        function getRandom() {
            return Math.random() >= 0.5
        }
        let attendanceRecord = {}
        for (let name of this.studentList) {
            let values = []
            for (let n = 1; n <= 12; n++) {
                values.push(getRandom())
            }
            attendanceRecord[name] = values
        }
        localStorage.attendance_record = JSON.stringify(attendanceRecord)
        console.log('Attendance record created!!')
    },
    renderAttendanceRecord: function() {
        let attendanceRecord = JSON.parse(localStorage.attendance_record),
            checkboxes = controller.returnCheckboxes(),
            listOfNames = this.studentList,
            index = 0
        for (let name of listOfNames) {
            for (let indexValue in attendanceRecord[name]) {
                attendanceRecord[name][indexValue] = checkboxes[index].firstElementChild.checked
                index++
            }
        }
        localStorage.attendance_record = JSON.stringify(attendanceRecord)
    }
}

// My octopus code
var controller = {
    init: function() {
        view.init()
    },
    returnStudentList: function() {
        return model.studentList
    },
    createAttendanceRecord: function() {
        model.createAttendanceRecord()
    },
    renderAttendanceRecord: function() {
        model.renderAttendanceRecord()
    },
    returnCheckboxes: function() {
        return view.checkboxes
    }
}

// attendance view
var view = {
    table: document.getElementById('t-attendance'),
    thead: document.querySelector('#t-attendance thead'),
    tbody: document.querySelector('#t-attendance tbody'),
    students: document.getElementsByClassName('student'),
    checkboxes: document.getElementsByClassName('checkbox'), // Really these are the checkbox's container (td's)
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
                    controller.renderAttendanceRecord()
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
        if (!localStorage.attendance_record) {
            controller.createAttendanceRecord()
            this.render()
        } else {
            this.render()
        }
    },
    renderMissedCol: function() {
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
            row.lastElementChild.textContent = checksInRow.length - totalDays
        }
    },
    renderCheckboxes: function() {
        let attendanceRecord = JSON.parse(localStorage.attendance_record),
            checkboxes = this.checkboxes,
            listOfNames = controller.returnStudentList(),
            index = 0
        for (let name of listOfNames) {
            for (let value of attendanceRecord[name]) {
                checkboxes[index].firstElementChild.checked = value
                index++
            }
        }
    },
    render: function() {
        this.renderCheckboxes()
        this.renderMissedCol()
    }
}

controller.init()