const Order = require('../models/order')
const moment = require('moment')
const errorHandler = require('../utils/errorHandler')

module.exports.getOverview = async function(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
    const ordersMap = getOrdersMap(allOrders)
    const todayOrders = ordersMap[moment().format('DD.MM.YYYY')] || []

    // The number of orders
    const totalOrdersNumber = allOrders.length

    // Total number of days
    const daysNumber = Object.keys(ordersMap).length
    // Number of orders yesterday
    const todayOrdersNumber = todayOrders.length
    // Orders per day
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
    // Percentage for the number of orders
    const ordersPercent = (((todayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
    // Total revenues
    const totalGain = calculatePrice(allOrders)
    // Revenue per day
    const gainPerDay = totalGain / daysNumber
    // Revenue for today
    const todayGain = calculatePrice(todayOrders).toFixed(2)
    // Percentage revenue
    const gainPercent = (((todayGain / gainPerDay) - 1) * 100).toFixed(2)
    // Revenue Comparison
    const compareGain = (todayGain - gainPerDay).toFixed(2)
    // Comparison of number of orders
    const compareNumber = (todayOrdersNumber - ordersPerDay).toFixed(0)

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        today: +todayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        today: +todayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    })

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getAnalytics = async function(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
  
    const ordersMap = getOrdersMap(allOrders);

    const average = calculatePrice(allOrders) / Object.keys(ordersMap).length

    const chart = Object.keys(ordersMap).map(label => {
      const gain = calculatePrice(ordersMap[label])
      const order = ordersMap[label].length
      return {
        label, gain, order
      }
    })

    res.status(200).json({
      chart,
      average: +average.toFixed(2)
    })
  } catch (e) {
    errorHandler(res, e)
  }
}


function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity
    }, 0)
    return total += orderPrice
  }, 0)
}

function getOrdersMap(orders = []) {
  const daysOrder = {}
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')
    
    if (!daysOrder[date]) {
      daysOrder[date] = []
    }

    daysOrder[date].push(order)
  })
  return daysOrder
}