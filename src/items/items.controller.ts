import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
  private items: Item[] = [];

  @Get()
  findAll(): Item[] {
    return this.items;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Item {
    return this.items.find(item => item.id === +id);
  }

  @Post()
  create(@Body() item: Item): Item {
    item.id = this.items.length + 1;
    this.items.push(item);
    return item;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedItem: Item): Item {
    const index = this.items.findIndex(item => item.id === +id);
    this.items[index] = { ...this.items[index], ...updatedItem };
    return this.items[index];
  }

  @Delete(':id')
  remove(@Param('id') id: string): Item {
    const index = this.items.findIndex(item => item.id === +id);
    const [removedItem] = this.items.splice(index, 1);
    return removedItem;
  }
}
