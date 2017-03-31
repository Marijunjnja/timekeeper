import {Router} from 'express'
import {get as getView} from './autoload/views'
const router = new Router()

router.post('*', (req, res) => {
  const {name, data} = req.body

  res.render(name, data || {})
})

router.get('*', (req, res) => {
  const name = req.originalUrl.slice(1)
  const data = req.body

  try {
    const _view = getView(name)
    res.status(200).send('Ok')
  } catch(e) {
    if(e.toString().indexOf('Cannot find module')) {
      res.status(404).send('Not found')
    } else {
      throw e;
    }
  }
})

export default router
