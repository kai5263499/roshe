Ext.application({
    name: 'roshe',
    
    views : ['Login','Main'],
    controllers: ['Survey'],
    models: ['SurveyQuestion'],
    stores: ['SurveyQuestions'],
    
    launch: function() {
        Ext.Viewport.add([{xtype:'Login'},{xtype:'List'},{xtype:'Question'}]);
    }
});