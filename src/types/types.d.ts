type StravaEvent = {
  aspect_type: 'create' | 'update' | 'delete';
  object_type: 'activity';
  object_id: number;
  owner_id: number;
};
