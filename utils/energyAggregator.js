/**
 * Gets Availablity based on Electricity produced 
 * 
 * formula is produced / produced + lost
 *
 * @param   {[type]}  produced  [produced description]
 * @param   {[type]}  lost      [lost description]
 *
 * @return  {[type]}            [return description]
 */
const getAvailability = (produced, lost) => {
    return produced / (produced + lost) * 100
}



/**
 * gets Month index in constant time
 *
 * @var {[type]}
 */const getMonthName = (index) => {
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]
    return months[index]
}


/**
 * Gets the list of turbines Object for a particular month
 *
 * @var {[type]}
 */const aggregateTurbines = (days) => {
    const turbines = {}
    for(let i = 0; i < days.length; i+=1) {
        const currentDay = days[i]

        if (currentDay.turbine in turbines) {
            turbines[currentDay.turbine].energyProduced = currentDay.energyProduced
            turbines[currentDay.turbine].energyLost
        }else {
            const newTurbineObject = {
                energyProduced: currentDay.energyProduced,
                energyLost: currentDay.energyLost
            }
            turbines[currentDay.turbine] = newTurbineObject
        }
    }
    return turbines
}

/**
 * Gets worst Torbine based on a list of days object
 *
 * @param   {[] Object}  days  [days object for a month]
 *
 * @return  {String}        Name of the worst torbine
 */
const worstTurbine = (days) => {
    const turbines = aggregateTurbines(days)
    let worstTurbine = ''
    let worstAvailability = 100
    for (const turbineKey in turbines) {
        const turbine = turbines[turbineKey]
        const turbineAvailability = getAvailability(turbine.energyProduced, turbine.energyLost)
        if (turbineAvailability < worstAvailability) {
            worstTurbine = turbineKey
            worstAvailability = turbineAvailability
        }
     }
    return worstTurbine
}




/**
 * Calculates Monthly Data based on data returned from api, each month object contains energyProduced, energyLost, availability
 *
 * @param   {Object}  months         [months description]
 * @param   {Object}  currentObject  [currentObject description]
 *
 * @return  {Object}                 months Object
 */const getMonthlyData = (apiData) => {
    const monthlyData = apiData.reduce((months, currentObject) => {
        const currentDate = new Date(currentObject.bucket)
        const currentMonth = currentDate.getMonth()
        if (currentMonth in months) {
            months[currentMonth].days.push(currentObject)
            months[currentMonth].energyProduced += currentObject.energyProduced
            months[currentMonth].energyLost+= currentObject.energyLost
        }else { 
            const monthObject = {
                days: [currentObject],
                energyProduced: currentObject.energyProduced,
                energyLost: currentObject.energyLost,
                
            }
            months[currentMonth] = monthObject
        }
        months[currentMonth].availability = getAvailability(months[currentMonth].energyProduced, months[currentMonth].energyLost)
        return months
    }, {})

    for (const monthsKey in monthlyData) {
        monthlyData[monthsKey].worstTurbine = worstTurbine(monthlyData[monthsKey].days)
        monthlyData[monthsKey].name = getMonthName(monthsKey)
    }
    return monthlyData
}


export {getMonthlyData}