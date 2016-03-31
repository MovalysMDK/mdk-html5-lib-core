'use strict';
/**
 * 
 *
 * <p>Copyright (c) 2010</p>
 * <p>Company: Adeuza</p>
 *
 */

//@non-generated-start[jshint-override]
//@non-generated-end

angular.module('data-daotest-sql').factory('WordDaoSql',
	['WordDaoMapping', 'MFSyncPromiseProvider', 'MFDaoSqlAbstract', 'MFUtils', 'MFMappingHelper',
//@non-generated-start[dependencies-names][X]
//@non-generated-end

//@non-generated-start[dependencies-classes][X]
function(WordDaoMapping, $qSync, MFDaoSqlAbstract, MFUtils, MFMappingHelper
//@non-generated-end
)
{

	var WordDaoSql = function WordDaoSql(){
		// Constructor
//@non-generated-start[constructor][X]
		WordDaoSql._Parent.call(this);
		this.lastId = null;
		this.mapping = WordDaoMapping.mappingSql;
		this.syncDisabled = false;
		this.tableName = 'T_WORD';
		this.entityName = 'Word';
		this.cascadeDefinition = [
		];

//@non-generated-end
	};

	MFUtils.extendFromInstance(WordDaoSql, MFDaoSqlAbstract);



	//==================================================================================
	//========   SPECIFIC METHODS - GET
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoSql#getWordById
	 * @function
	 *
	 * @description
	 * Returns a Word by id.
	 *
	 * @param {Integer} p_id Integer id of the Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Word} Returns the Word, including children if required
	 */
	WordDaoSql.prototype.getWordById = function(p_id, p_context, p_cascadeSet) {

//@non-generated-start[getWordById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.getWordById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.getWordById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'WordDaoSql.getWordById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_id, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead[0]);
},
function (returnedError_cascade) {
console.error('WordDaoSql.getWordById(): cascade error: ', returnedError_cascade);
p_context.addError('WordDaoSql.getWordById(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('WordDaoSql.getWordById(): error: ', returnedError_executeQueryToRead);
p_context.addError('WordDaoSql.getWordById(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getWordById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#getListWord
	 * @function
	 *
	 * @description
	 * Returns a list of Words according to the parameter(s).
	 *
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Words, including children if required.
	 */
	WordDaoSql.prototype.getListWord = function(p_context, p_cascadeSet) {

//@non-generated-start[getListWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.getListWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.getListWord() : p_cascadeSet is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('*', [], p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('WordDaoSql.getListWord(): cascade error: ', returnedError_cascade);
p_context.addError('WordDaoSql.getListWord(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('WordDaoSql.getListWord(): error: ', returnedError_executeQueryToRead);
p_context.addError('WordDaoSql.getListWord(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListWord-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#getListWordByIds
	 * @function
	 *
	 * @description
	 * Returns a list of Words by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Words to process (optional)
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 *
	 * @returns {Array<String>} Returns an Array of Words, including children if required.
	 */
	WordDaoSql.prototype.getListWordByIds = function(p_ids, p_context, p_cascadeSet) {

//@non-generated-start[getListWordByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.getListWordByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.getListWordByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'WordDaoSql.getListWordByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		self.getEntitiesByProperty('id', p_ids, p_context).then(

function (returnedSuccess_executeQueryToRead) { /* SUCCESS */
self.loadChildrenIfNeeded(p_context, returnedSuccess_executeQueryToRead, p_cascadeSet).then(
function (returnedSuccess_cascade) {
deferred.resolve(returnedSuccess_executeQueryToRead);
},
function (returnedError_cascade) {
console.error('WordDaoSql.getListWordByIds(): cascade error: ', returnedError_cascade);
p_context.addError('WordDaoSql.getListWordByIds(): cascade error: '+ returnedError_cascade);
deferred.reject(returnedError_cascade);
}
);
},
function (returnedError_executeQueryToRead) { /* ERROR */
console.error('WordDaoSql.getListWordByIds(): error: ', returnedError_executeQueryToRead);
p_context.addError('WordDaoSql.getListWordByIds(): error: '+ returnedError_executeQueryToRead);
deferred.reject(returnedError_executeQueryToRead);
}
);

//@non-generated-start[getListWordByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoSql#saveWord
	 * @function
	 *
	 * @description
	 * Saves a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was saved, false otherwise.
	 */
	WordDaoSql.prototype.saveWord = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.saveWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.saveWord() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'WordDaoSql.saveWord() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		self.fixDoubleWaysRelationship(p_entity);
		// --------------------------
		// 1. save or update children pointed by the parent : for relationships xxx_to_one
		// --------------------------
		var savePointedChildren = [];


		$qSync.all(savePointedChildren).then(
			function(success) { /* SUCCESS */
				// --------------------------
				// 2. save the main entity
				// --------------------------

				self.saveEntity(p_entity, p_context, p_toSync).then(
					function (success_result) {

						var saveOtherChildren = [];


						$qSync.all(saveOtherChildren).then(
							function(success) {
								deferred.resolve(success_result);
							},
							function(error) {
								deferred.reject(error);
							}
						);
					},
					function(failure_result) {
						deferred.reject(failure_result);
					}
				);
			},
			function (error) { /* ERROR */
				deferred.reject(error);
			}
		);


//@non-generated-start[saveWord-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#saveListWord
	 * @function
	 *
	 * @description
	 * Saves a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was saved, false otherwise.
	 */
	WordDaoSql.prototype.saveListWord = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[saveListWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.saveListWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.saveListWord() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'WordDaoSql.saveListWord() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveListWord() => saveWord() */
		var o_arrayPromisesSaveWord = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesSaveWord.push( self.saveWord(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveWord.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveWord) );


//@non-generated-start[saveListWord-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoSql#updateWord
	 * @function
	 *
	 * @description
	 * Updates a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was updated, false otherwise.
	 */
	WordDaoSql.prototype.updateWord = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.updateWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.updateWord() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'WordDaoSql.updateWord() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		var childrenPromises = [];

		self.fixDoubleWaysRelationship(p_entity);




		$qSync.all(childrenPromises).then(
			function(success){
				console.log('children updated', success);

				// 3. update the parent
				self.updateEntity(p_entity, p_context, p_toSync).then(
					function (success_result) { /* SUCCESS */
						console.log('parent updated', success_result);
						deferred.resolve(success_result);
					},
					function (failure_result) { /* ERROR */
						deferred.reject(failure_result);
					}
				);
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[updateWord-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#updateListWord
	 * @function
	 *
	 * @description
	 * Updates a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was updated, false otherwise.
	 */
	WordDaoSql.prototype.updateListWord = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[updateListWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.updateListWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.updateListWord() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'WordDaoSql.updateListWord() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* updateListWord() => updateWord() */
		var o_arrayPromisesUpdateWord = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesUpdateWord.push( self.updateWord(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesUpdateWord.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesUpdateWord) );


//@non-generated-start[updateListWord-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - SAVE & UPDATE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoSql#saveOrUpdateWord
	 * @function
	 *
	 * @description
	 * Saves of updates a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was saved or updated, false otherwise.
	 */
	WordDaoSql.prototype.saveOrUpdateWord = function(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.saveOrUpdateWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.saveOrUpdateWord() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'WordDaoSql.saveOrUpdateWord() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		if(p_entity.idToString !== -1) { 
			this.exist(p_entity, p_context).then(function(result) {
				if(result){ 
					/* updateWord */
					console.log('WordDaoSql.saveOrUpdateWord(): entity exists  => updateWord()');
					deferred.resolve( self.updateWord(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) );
				} else {
				/* saveWord */
					console.log('WordDaoSql.saveOrUpdateWord(): entity does not exist  => saveWord()');
					deferred.resolve( self.saveWord(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
				}
			},
 			function(error) { 
				deferred.reject(error); 
			});
		} else { 
			/* saveWord */
			console.log('WordDaoSql.saveOrUpdateWord(): entity does not exist  => saveWord()');
			deferred.resolve( self.saveWord(p_entity, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) ); // last parameter ignored by called method
		}


//@non-generated-start[saveOrUpdateWord-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#saveOrUpdateListWord
	 * @function
	 *
	 * @description
	 * Saves of updates a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 * @param {Array<String>} p_cascadeSetForDelete Array containing children tables names with entites to delete within the process
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was saved or updated, false otherwise.
	 */
	WordDaoSql.prototype.saveOrUpdateListWord = function(p_entities, p_context, p_cascadeSet, p_toSync, p_cascadeSetForDelete) {

//@non-generated-start[saveOrUpdateListWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.saveOrUpdateListWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.saveOrUpdateListWord() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'WordDaoSql.saveOrUpdateListWord() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* saveOrUpdateListWord() => saveOrUpdateWord() */
		var o_arrayPromisesSaveOrUpdateWord = [];
		for(var i = 0; i < p_entities.length; i++) {
			o_arrayPromisesSaveOrUpdateWord.push( self.saveOrUpdateWord(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync, angular.copy(p_cascadeSetForDelete)) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesSaveOrUpdateWord.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesSaveOrUpdateWord) );


//@non-generated-start[saveOrUpdateListWord-after][X]
//@non-generated-end

		return deferred.promise;
	};



	//==================================================================================
	//========   SPECIFIC METHODS - DELETE
	//==================================================================================
	/**
	 * @ngdoc method
	 * @name WordDaoSql#deleteWord
	 * @function
	 *
	 * @description
	 * Delete a Word.
	 *
	 * @param {Word} p_entity Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was deleted, false otherwise.
	 */
	WordDaoSql.prototype.deleteWord = function(p_entity, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.deleteWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.deleteWord() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_entity), 'WordDaoSql.deleteWord() : p_entity is required');

		var deferred = $qSync.defer();
		var self = this;

		//0. load children that should always be deleted or updated
		self.loadChildrenIfNeeded(p_context, p_entity, p_cascadeSet).then(
			function(returnedSuccess_loadChildrenIfNeeded){
				var pointersDeletes = [];




				$qSync.all(pointersDeletes).then(
					function(returnedSuccess_pointers){ /* SUCCESS */

						// 4. delete the parent
						self.deleteEntity(p_entity, p_context, p_toSync).then(
							function (returnedSuccess_executeQueryToDelete) { /* SUCCESS */
								pointersDeletes = [];

								$qSync.all(pointersDeletes).then(
									function(returnedSuccess_executeQuery2ToDelete) { /* SUCCESS */
										deferred.resolve(returnedSuccess_executeQuery2ToDelete);
									},
									function (returnedError_executeQuery2ToDelete) { /* ERROR */
										console.error('WordDaoSql.deleteWord(): error: ', returnedError_executeQuery2ToDelete);
										p_context.addError('WordDaoSql.deleteWord(): error: '+ returnedError_executeQuery2ToDelete);
										deferred.reject(returnedError_executeQuery2ToDelete);
									}
								);

							},
							function(returnedError_executeQueryToDelete){ /* ERROR */
								deferred.reject(returnedError_executeQueryToDelete);
							}
						);

					},
					function(returnedError_pointers){ /* ERROR */
						deferred.reject(returnedError_pointers);
					}
				);
			},
			function(returnedError_loadChildrenIfNeeded){ /* ERROR */
				deferred.reject(returnedError_loadChildrenIfNeeded);
			}
		);

//@non-generated-start[deleteWord-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#deleteWordById
	 * @function
	 *
	 * @description
	 * Deletes a Word by id.
	 *
	 * @param {Integer} p_id Integer id of the Word to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Promise} Returns a promise equal to true if the Word was deleted, false otherwise.
	 */
	WordDaoSql.prototype.deleteWordById = function(p_id, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteWordById-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.deleteWordById() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.deleteWordById() : p_cascadeSet is required and should be an array');
		console.assert(!angular.isUndefinedOrNull(p_id), 'WordDaoSql.deleteWordById() : p_id is required');

		var deferred = $qSync.defer();
		var self = this;

		self.getWordById(p_id, p_context, angular.copy(p_cascadeSet), p_toSync).then(
			function(entity){
				deferred.resolve( self.deleteWord(entity, p_context, angular.copy(p_cascadeSet), p_toSync) );
			},
			function(error){
				deferred.reject(error);
			}
		);


//@non-generated-start[deleteWordById-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#deleteListWord
	 * @function
	 *
	 * @description
	 * Deletes a list of Words.
	 *
	 * @param {Array<Word>} p_entities Array containing Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was deleted, false otherwise.
	 */
	WordDaoSql.prototype.deleteListWord = function(p_entities, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListWord-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.deleteListWord() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.deleteListWord() : p_cascadeSet is required and should be an array');
		console.assert(angular.isArray(p_entities), 'WordDaoSql.deleteListWord() : p_entities is required and should be an array');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListWord() => deleteWord() */
		var o_arrayPromisesDeleteWord = [];
		for( var i = 0; i < p_entities.length; i++ ) {
			o_arrayPromisesDeleteWord.push( self.deleteWord(p_entities[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteWord.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteWord) );


//@non-generated-start[deleteListWord-after][X]
//@non-generated-end

		return deferred.promise;
	};


	/**
	 * @ngdoc method
	 * @name WordDaoSql#deleteListWordByIds
	 * @function
	 *
	 * @description
	 * Deletes a list of Words by ids.
	 *
	 * @param {Array<Integer>} p_ids Array containing ids of Words to process
	 * @param {MFContext} p_context MFContext object
	 * @param {Array<String>} p_cascadeSet Array containing children tables names to process
	 * @param {Boolean} p_toSync Boolean equal to true when sync must be done, false otherwise
	 *
	 * @returns {Array<Promise>} Returns an Array of promise results equal to true if the list of Words was deleted, false otherwise.
	 */
	WordDaoSql.prototype.deleteListWordByIds = function(p_ids, p_context, p_cascadeSet, p_toSync) {

//@non-generated-start[deleteListWordByIds-before][X]
//@non-generated-end

		console.assert(!angular.isUndefinedOrNull(p_context), 'WordDaoSql.deleteListWordByIds() : p_context is required ');
		console.assert(angular.isArray(p_cascadeSet), 'WordDaoSql.deleteListWordByIds() : p_cascadeSet is required and should be an array');
		console.assert(angular.isUndefinedOrNull(p_ids) || angular.isArray(p_ids), 'WordDaoSql.deleteListWordByIds() : p_ids should be an array, if given');

		var deferred = $qSync.defer();
		var self = this;

		/* deleteListWordByIds() => deleteListWordById() */
		var o_arrayPromisesDeleteWord = [];
		for( var i = 0; i < p_ids.length; i++ ) {
			o_arrayPromisesDeleteWord.push( self.deleteWordById(p_ids[i], p_context, angular.copy(p_cascadeSet), p_toSync) );
		}
		// $qSync.all() returns an array of the results of o_arrayPromisesDeleteWord.
		// If the value returned by $qSync.all() is a rejection, the promise will be rejected instead.
		deferred.resolve( $qSync.all(o_arrayPromisesDeleteWord) );


//@non-generated-start[deleteListWordByIds-after][X]
//@non-generated-end

		return deferred.promise;
	};



//@non-generated-start[other-methods][X]
//@non-generated-end


	return new WordDaoSql();
}]);
