import User from './entity'
import { JsonController, Get, Param, Put, Body, Post, NotFoundError, Authorized } from 'routing-controllers'

@JsonController()
export default class UserController {

  
  @Post('/users')
  async createUser(
    @Body() user: User
  ) {
    const {password, ...rest} = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }
  

  @Get('/users')
  async allUsers(){
  const users= await User.find()
  return { users }
  } 

  @Get('/users/:id')
    getUser(
        @Param('id') id: number
    ): Promise<User | undefined> {
        return User.findOne(id)
    }
    @Authorized()
    @Put('/users/:id')
    async updateUser(
    @Param('id') id: number,
    @Body() update: Partial<User>
  ) {
    const user = await User.findOne(id)
    if (!user) throw new NotFoundError('Cannot find page')
    return User.merge(user, update).save()
  }

}