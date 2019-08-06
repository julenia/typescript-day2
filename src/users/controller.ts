import User from './entity'
import { JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError } from 'routing-controllers'

@JsonController()
export default class PageController {

  @Post('/users')
  @HttpCode(201)
  createPage(
    @Body() user: User
  ) {
    return user.save()
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