import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  /**
   * Créer une nouvelle session
   * @param createSessionDto Données pour créer une session
   */
  @Post()
  @ApiBody({ type: CreateSessionDto })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  /**
   * Récupérer toutes les sessions
   */
  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  /**
   * Récupérer une session par ID
   * @param id Identifiant de la session
   */
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID de la session' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessionService.findOne(id);
  }

  /**
   * Mettre à jour une session
   * @param id Identifiant de la session
   * @param updateSessionDto Données de mise à jour
   */
  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID de la session' })
  @ApiBody({ type: UpdateSessionDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionService.update(id, updateSessionDto);
  }

  /**
   * Supprimer une session par ID
   * @param id Identifiant de la session
   */
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID de la session' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sessionService.remove(id);
  }
}
