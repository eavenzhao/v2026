import router from '@adonisjs/core/services/router'

const CategoriesController = () => import('#controllers/categories_controller')
router.get('/', async () => 'welcome')

router.resource('category', CategoriesController).apiOnly()



